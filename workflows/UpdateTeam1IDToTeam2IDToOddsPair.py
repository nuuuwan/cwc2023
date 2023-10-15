from selenium.webdriver.common.by import By

from workflows import odds_utils
from workflows.AbstractUpdateData import AbstractUpdateData
from workflows.TEAM_NAME_TO_ID import TEAM_NAME_TO_ID


class UpdateTeam1IDToTeam2IDToOddsPair(AbstractUpdateData):
    @property
    def url(self) -> str:
        return 'https://www.oddsportal.com/cricket/world/icc-world-cup/'

    def parse_values_list(self, driver) -> list[list[str]]:
        div_list = driver.find_elements(By.CLASS_NAME, 'border-black-borders')
        values_list = []
        for div in div_list:
            values = div.text.split('\n')
            if len(values) > 2 and values[2] == '–':
                values_list.append(values)
            elif len(values) > 3 and values[3] in [':', '–']:
                values_list.append(values)

        return values_list

    @staticmethod
    def parse_values(values):
        if values[4] == '-':
            return None
        if values[2] == '–':
            team1_name, team2_name = values[1], values[3]
            odds1_str, odds2_str = values[4], values[5]
        elif values[3] in [':', '–']:
            team1_name, team2_name = values[1], values[5]
            odds1_str, odds2_str = values[8], values[9]
        else:
            raise Exception('Invalid values')
        return team1_name, team2_name, odds1_str, odds2_str

    @staticmethod
    def get_odds_pair(values_list: list[list[str]]) -> dict[str, float]:
        idx = {}
        for values in values_list:
            tokens = UpdateTeam1IDToTeam2IDToOddsPair.parse_values(values)
            if tokens is None:
                continue
            team1_name, team2_name, odds1_str, odds2_str = tokens

            team1_id, team2_id = (
                TEAM_NAME_TO_ID[team1_name],
                TEAM_NAME_TO_ID[team2_name],
            )
            team1_odds, team2_odds = odds_utils.parse_odds(
                odds1_str
            ), odds_utils.parse_odds(odds2_str)

            if team1_odds > team2_odds:
                team2_id, team1_id = team1_id, team2_id
                team2_odds, team1_odds = team1_odds, team2_odds

            if team1_id not in idx:
                idx[team1_id] = {}
            idx[team1_id][team2_id] = [
                team1_odds,
                team2_odds,
            ]

        return idx

    @property
    def body_lines(self) -> list[str]:
        team1_id_to_team2_id_to_odds_pair = (
            UpdateTeam1IDToTeam2IDToOddsPair.get_odds_pair(self.values_list)
        )
        lines = [
            'import { TEAM } from "../core/Team.js";',
            '',
            f'export const {self.js_var_name} = {{',
        ]
        for (
            team1_id,
            team2_id_to_odds_pair,
        ) in team1_id_to_team2_id_to_odds_pair.items():
            lines.append(f'  [TEAM.{team1_id}.id]: ' + '{')
            for team2_id, odds_pair in team2_id_to_odds_pair.items():
                [odds1, odds2] = odds_pair
                lines.append(
                    f'    [TEAM.{team2_id}.id]: [{odds1:.2f}, {odds2:.2f}],'
                )
            lines.append('  },')
        lines.append('};')
        return lines


if __name__ == '__main__':
    UpdateTeam1IDToTeam2IDToOddsPair().write()
