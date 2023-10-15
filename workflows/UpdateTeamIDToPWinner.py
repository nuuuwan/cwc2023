from selenium.webdriver.common.by import By

from workflows import odds_utils
from workflows.AbstractUpdateData import AbstractUpdateData
from workflows.TEAM_NAME_TO_ID import TEAM_NAME_TO_ID


class UpdateTeamIDToPWinner(AbstractUpdateData):
    @property
    def url(self) -> str:
        return (
            'https://www.oddsportal.com'
            + '/cricket/world/icc-world-cup/outrights/'
        )

    def parse_values_list(self, driver) -> list[list[str]]:
        div_list = driver.find_elements(By.CLASS_NAME, 'border-gray-medium')
        values_list = []
        for div in div_list:
            values = div.text.split('\n')
            if len(values) != 3:
                continue
            values_list.append(values)
        return values_list

    @staticmethod
    def get_team_id_to_raw_odds(
        values_list: list[list[str]],
    ) -> dict[str, str]:
        team_id_to_raw_odds = {}
        for values in values_list:
            team_name = values[0]
            team_id = TEAM_NAME_TO_ID[team_name]
            odds = values[2]
            team_id_to_raw_odds[team_id] = odds
        return team_id_to_raw_odds

    @staticmethod
    def get_team_id_to_odds(team_id_to_raw_odds: dict[str, str]):
        team_id_to_odds = dict(
            list(
                map(
                    lambda x: (x[0], odds_utils.parse_odds(x[1])),
                    team_id_to_raw_odds.items(),
                )
            )
        )
        return team_id_to_odds

    @staticmethod
    def get_team_id_to_p_winner(
        team_id_to_odds: dict[str, float]
    ) -> dict[str, float]:
        team_id_to_q = {}
        for team_id, odds in team_id_to_odds.items():
            team_id_to_q[team_id] = 1 / odds

        q_sum = sum(team_id_to_q.values())
        team_id_to_p_winner = {}
        for team_id, q in team_id_to_q.items():
            p = q / q_sum
            team_id_to_p_winner[team_id] = p
        return team_id_to_p_winner

    @property
    def body_lines(self) -> list[str]:
        team_id_to_raw_odds = UpdateTeamIDToPWinner.get_team_id_to_raw_odds(
            self.values_list
        )

        if len(team_id_to_raw_odds) != 10:
            self.log.warning('Expected 10 teams.')
            return None

        team_id_to_odds = UpdateTeamIDToPWinner.get_team_id_to_odds(
            team_id_to_raw_odds
        )
        team_id_to_p_winner = UpdateTeamIDToPWinner.get_team_id_to_p_winner(
            team_id_to_odds
        )

        lines = [f'export const {self.js_var_name} = {{']
        for team_id, p in team_id_to_p_winner.items():
            line = f'  {team_id}: {p:.6f}, // {p:.0%}'
            lines.append(line)
        lines.extend(['};'])
        return lines


if __name__ == '__main__':
    UpdateTeamIDToPWinner().write()
