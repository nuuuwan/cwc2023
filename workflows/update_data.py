from workflows import (update_odi_id_to_winner, update_points_table,
                       update_team1_id_to_team2_id_to_odds_pair,
                       update_team_id_to_p_winner, update_version)


def main():
    update_team_id_to_p_winner.main()
    update_odi_id_to_winner.main()
    update_team1_id_to_team2_id_to_odds_pair.main()
    update_points_table.main()

    update_version.main()


if __name__ == '__main__':
    main()
