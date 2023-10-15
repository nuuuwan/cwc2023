from selenium.webdriver.common.by import By

from workflows.AbstractUpdateData import AbstractUpdateData
from workflows.TEAM_NAME_TO_ID import TEAM_NAME_TO_ID


class UpdateODIIDToWinner(AbstractUpdateData):
    @property
    def url(self) -> str:
        return (
            'https://www.cricbuzz.com'
            + '/cricket-series/6732/icc-cricket-world-cup-2023/matches'
        )

    def parse_values_list(self, driver) -> list[list[str]]:
        div_list = driver.find_elements(By.CLASS_NAME, 'cb-srs-mtchs-tm')
        values_list = []
        for div in div_list:
            if 'vs' not in div.text or 'won' not in div.text:
                continue
            values = div.text.split('\n')
            values_list.append(values)
        return values_list

    @staticmethod
    def get_odi_id_to_winner_id(
        values_list: list[list[str]],
    ) -> dict[str, float]:
        odi_id_to_winner_id = {}

        for i_odi, values in enumerate(values_list):
            odi_id = f'ODI {i_odi + 1:02d}'
            winner_name = values[2].split(' won ')[0]
            winner_id = TEAM_NAME_TO_ID[winner_name]
            odi_id_to_winner_id[odi_id] = winner_id

        return odi_id_to_winner_id

    @property
    def body_lines(self) -> list[str]:
        odi_id_to_winner_id = UpdateODIIDToWinner.get_odi_id_to_winner_id(
            self.values_list
        )

        lines = [
            'import { TEAM } from "../core/Team.js";',
            '',
        ]

        lines.append(f'export const {self.js_var_name} = {{')
        for odi_id, winner_id in odi_id_to_winner_id.items():
            line = f'  "{odi_id}": TEAM.{winner_id},'
            lines.append(line)
        lines.extend(['};'])
        return lines


if __name__ == '__main__':
    UpdateODIIDToWinner().write()
