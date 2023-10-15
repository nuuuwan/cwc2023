from selenium.webdriver.common.by import By

from workflows.AbstractUpdateData import AbstractUpdateData
from workflows.TEAM_NAME_TO_ID import TEAM_NAME_TO_ID


class UpdatePointsTable(AbstractUpdateData):
    @property
    def id(self):
        return 'points_table'

    @property
    def url(self):
        return 'https://www.cricketworldcup.com/standings'

    def parse_values_list(self, driver) -> list[list[str]]:
        table = driver.find_element(By.CLASS_NAME, 'table')

        values_list = []
        for tr in table.find_elements(By.TAG_NAME, 'tr'):
            values = [td.text for td in tr.find_elements(By.TAG_NAME, 'td')]
            if len(values) != 9:
                continue
            values_list.append(values)

        return values_list

    @staticmethod
    def get_points_table(values_list: list[list[str]]) -> dict[str, str]:
        points_table = []
        for values in values_list:
            [
                rank,
                team_name,
                n_played,
                n_won,
                n_lost,
                n_no_result,
                n_tied,
                net_run_rate,
                points,
            ] = values
            points = dict(
                rank=int(rank),
                team_name=team_name,
                n_played=int(n_played),
                n_won=int(n_won),
                n_lost=int(n_lost),
                n_no_result=int(n_no_result),
                n_tied=int(n_tied),
                net_run_rate=float(net_run_rate),
                points=int(points),
            )
            points_table.append(points)
        return points_table

    @property
    def body_lines(self):
        points_table = UpdatePointsTable.get_points_table(self.values_list)
        lines = [
            'import { TEAM } from "../core/Team.js";',
            '',
        ]

        lines.append('export const POINTS_TABLE = [')
        for points in points_table:
            team_id = TEAM_NAME_TO_ID[points['team_name']]
            lines.extend(
                [
                    '  {',
                    f'    rank: {points["rank"]},',
                    f'    team: TEAM.{team_id},',
                    f'    nPlayed: {points["n_played"]},',
                    f'    nWon: {points["n_won"]},',
                    f'    nLost: {points["n_lost"]},',
                    f'    nNoResult: {points["n_no_result"]},',
                    f'    nTied: {points["n_tied"]},',
                    f'    netRunRate: {points["net_run_rate"]},',
                    f'    points: {points["points"]},',
                    '  },',
                ]
            )
        lines.extend(['];'])
        return lines


if __name__ == '__main__':
    UpdatePointsTable().write()
