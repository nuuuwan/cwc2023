from workflows import (update_odi_id_to_winner, update_team_id_to_p_winner)

# python workflows/update_data.py ; jlic "Updated Data";

def main():
    update_team_id_to_p_winner.main()
    update_odi_id_to_winner.main()



if __name__ == '__main__':
    main()
