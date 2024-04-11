#define _POSIX_C_SOURCE 200201L
#include <stdio.h>
#include <stdlib.h>
#include <curses.h>
#include <time.h>
#include <string.h>

struct player{
	int x_pos,y_pos;
	char shape;
};

struct alien {
	int x_pos, y_pos;
	int p_x_pos, p_y_pos;
	int state; // 1 - alive, 0 - dead
	char direction; // 'L' or 'l' - left 'R' or 'r' - right
	char shape;
    int color;
};

struct player_ammo{
	int x_pos, y_pos;
	int state; // 1 or 0 - active/inactive
	char shape;
};

struct alien_ammo{
	int x_pos, y_pos;
	int state;
	int buff; //so the aliens dont blink when they shoot a laser
	char shape;
};

struct leader{
    int score;
    char name[30];
};

//////////CONSTS///////////////

#define ALIEN 12
#define ALIEN_AMMO_CHANCE 5
#define OVERALL 15000
#define LASERS 10
#define MAX_ALIEN_AMMO 7
#define MAX_PLAYER_AMMO 5


void game_end(int win,int score, char *name);
void leaderboard(int score, char *name);

int main(int argc, char *argv[]){
    char name[30] = {'P','l','a','y','e','r','\0'};
 
    if(argc > 1){
        strcpy(name,argv[1]);
    }

    struct timespec ts = {
    .tv_sec = 0,
    .tv_nsec = 0.001 * 5000000000L
    };
    nanosleep(&ts, NULL);
	struct player battleship;
	struct alien aliens[30];
    int active_lasers = 0, score = 0, active_bullets = 0,active_aliens = 30, buff = 0, random = 0, win = -1, input;
	struct player_ammo bullet[MAX_PLAYER_AMMO];
	struct alien_ammo laser[MAX_ALIEN_AMMO];
    char scoree[100];
    
	initscr();
    start_color();
   	clear();
	noecho();
   	cbreak();
   	nodelay(stdscr,1);
   	keypad(stdscr,1);
   	srand(time(NULL)); 
    curs_set(0);

    init_pair(1, COLOR_RED, COLOR_BLACK);
    init_pair(2, COLOR_BLUE, COLOR_BLACK);
    init_pair(3, COLOR_GREEN, COLOR_BLACK);
    init_pair(4, COLOR_YELLOW, COLOR_BLACK);
    init_pair(5, COLOR_CYAN, COLOR_BLACK);
    init_pair(6, COLOR_MAGENTA, COLOR_BLACK);
   
/////////////////CONSTRUCTORS//////////////////////	
	
	//player stats
	battleship.y_pos = LINES - 1;
	battleship.x_pos = COLS / 2;
	battleship.shape = '^';

    //alien stats

    
    for(int i = 0; i < 10; i++){
        aliens[i].y_pos = 1;
        aliens[i].x_pos = i * 3;
        aliens[i].p_y_pos = 0;
        aliens[i].p_x_pos = 0;
        aliens[i].shape = '#';
        aliens[i].state = 1;
        aliens[i].direction = 'r';
        aliens[i].color = 1;
    }

    for(int i = 10; i < 20; i++){
        aliens[i].y_pos = 2;
        aliens[i].x_pos = (i - 10)*3;
        aliens[i].p_y_pos = 0;
        aliens[i].p_x_pos = 0;
        aliens[i].shape = '&';
        aliens[i].state = 1;
        aliens[i].direction = 'r';
        aliens[i].color = 3;
    }

    for(int i = 20; i < 30; i++){
        aliens[i].y_pos = 3;
        aliens[i].x_pos = (i - 20)*3;
        aliens[i].p_y_pos = 0;
        aliens[i].p_x_pos = 0;
        aliens[i].shape = '@';
        aliens[i].state = 1;
        aliens[i].direction = 'r';
        aliens[i].color = 4;
    }

    //player ammo stats
    for(int i = 0; i < MAX_PLAYER_AMMO; i++){
        bullet[i].state = 0;
        bullet[i].shape = '*';
    }

    //alien ammo stats
    for(int i = 0; i < MAX_ALIEN_AMMO; i++){
        laser[i].state = 0;
        laser[i].shape = '|';
        laser[i].buff = '0';
    }
    

    move(0,(COLS/2)-9);
    addstr("SPACE INVADERS");
    move(0,1);
    addstr("SCORE: " );
    move(0,COLS - 19);





/////////////////GAME LOOP///////////////////////
    while(1){
        sprintf(scoree,"%d",score);
        move(0,8);
        addstr(scoree);
        //move battleship
        attron(COLOR_PAIR(2)|A_BOLD);
        mvprintw(battleship.y_pos, battleship.x_pos,"%c", battleship.shape);
        attroff(COLOR_PAIR(2)|A_BOLD);
        //draw aliens
        if(buff % ALIEN == 0)
        for(int i = 0; i < 30; i++){
            if(aliens[i].state == 1){
                move(aliens[i].p_y_pos, aliens[i].p_x_pos);
                addch(' ');
                attron(COLOR_PAIR(aliens[i].color)|A_BOLD);
                mvprintw(aliens[i].y_pos, aliens[i].x_pos, "%c", aliens[i].shape);
                attroff(COLOR_PAIR(aliens[i].color)|A_BOLD);
                aliens[i].p_y_pos = aliens[i].y_pos;
                aliens[i].p_x_pos = aliens[i].x_pos;
                //laser drop
                random = 1 + (rand()%100);
                if((ALIEN_AMMO_CHANCE - random) >= 0 && active_lasers < MAX_ALIEN_AMMO){
                    for(int j = 0; j < MAX_ALIEN_AMMO; j++){
                        if(laser[j].state ==0){
                            laser[j].state = 1;
                            active_lasers++;
                            laser[j].y_pos = aliens[i].y_pos + 1;
                            laser[j].x_pos = aliens[i].x_pos;
                            break;
                        }
                    }
                }
                //move aliens  
                if(aliens[i].direction == 'l'){
                    aliens[i].x_pos--;
                }
                else if(aliens[i].direction == 'r'){
                    aliens[i].x_pos++;
                }
                //turn and lower  aliens
                if(aliens[i].x_pos == COLS - 2){
                    aliens[i].y_pos++;
                    aliens[i].direction = 'l';
                }
                else if(aliens[i].x_pos == 0){
                    aliens[i].y_pos++;
                    aliens[i].direction = 'r';
                }
            }
        }
        //moving enemy ammo
        if(buff % LASERS == 0)
        for(int i = 0; i < MAX_ALIEN_AMMO; i++){
            if(laser[i].state == 1){
                if(laser[i].y_pos < LINES){
                    if(laser[i].buff != 0){
                        move(laser[i].y_pos - 1, laser[i].x_pos);
                        addch(' ');
                    }
                    else{laser[i].buff++;}
                    attron(COLOR_PAIR(5)|A_BOLD);
                    mvprintw(laser[i].y_pos,laser[i].x_pos,"%c",laser[i].shape);
                    attroff(COLOR_PAIR(5)|A_BOLD);
                    laser[i].y_pos++;
                }
                else{
                    laser[i].state = 0;
                    laser[i].buff = 0;
                    active_lasers--;
                    move(laser[i].y_pos - 1, laser[i].x_pos);
                    addch(' ');
                }
            }
        }
        //moving player ammo
        if(buff % MAX_PLAYER_AMMO == 0)
        for(int i = 0; i < MAX_PLAYER_AMMO; i++){
            if(bullet[i].state == 1){
                if(bullet[i].y_pos > 0){
                    if(bullet[i].y_pos < LINES - 2){
                        move(bullet[i].y_pos + 1, bullet[i].x_pos);
                        addch(' ');
                    }
                    for(int j = 0; j < 30; j++){
                        if(aliens[j].state == 1 && aliens[j].y_pos == bullet[i].y_pos && aliens[j].p_x_pos == bullet[i].x_pos){
                            score += 20;
                            aliens[j].state = 0;
                            bullet[i].state = 0;
                            active_bullets--;
                            active_aliens--;
                            move(aliens[j].p_y_pos,aliens[j].p_x_pos);
                            addch(' ');
                            break;
                        }
                    }
                    
                    if(bullet[i].state == 1){
                        
                        attron(COLOR_PAIR(6)|A_BOLD);
                        mvprintw(bullet[i].y_pos, bullet[i].x_pos, "%c", bullet[i].shape);
                        attroff(COLOR_PAIR(6)|A_BOLD);
                    
                        bullet[i].y_pos--;
                    }
                }
                else{
                    bullet[i].state = 0;
                    active_bullets--;
                    move(bullet[i].y_pos + 1, bullet[i].x_pos);
                    addch(' ');
                }
            }
        }
        //game end conditions
        if(active_aliens == 0){
            win = 1;
            break;
        }
        for(int i = 0; i < 30; i++){
            if(aliens[i].y_pos == LINES - 1){
                win = 0;
                break;
            }
        }
        for(int i = 0; i < MAX_ALIEN_AMMO; i++){
            if(laser[i].y_pos == battleship.y_pos && laser[i].x_pos == battleship.x_pos){
                win = 0;
                break;
            }
        }
        
        move(0,COLS-1);
        refresh();
        nanosleep(&ts, NULL);
        buff++;

        input = getch();
        move(battleship.y_pos, battleship.x_pos);
        addch(' ');

        if(input == KEY_LEFT){
            battleship.x_pos--;
        }
        else if(input == KEY_RIGHT){
            battleship.x_pos++;
        }
        else if(input == ' ' && active_bullets < MAX_PLAYER_AMMO){
            for(int i = 0; i < MAX_PLAYER_AMMO; i++){
                if(bullet[i].state == 0){
                    bullet[i].state = 1;
                    active_bullets++;
                    score--;
                    bullet[i].y_pos = LINES - 2;
                    bullet[i].x_pos = battleship.x_pos;
                    break;
                }
            }
        }
        else if(input == 'q')
            win = 2;
        if(win != -1){
            break;
        }
        if(battleship.x_pos > COLS-2){
            battleship.x_pos = COLS - 2;
        }
        else if(battleship.x_pos < 0){
            battleship.x_pos = 0;
        }
    }
    
    game_end(win,score,name);
    endwin();
	return 0;
}


void game_end(int win,int score,char *name){
    nodelay(stdscr,0);
    //FILE *leaderbardffdsfsfss = fopen("leaderboard.txt", "a+");
    if(win == 0){
        clear();
        move((LINES/2)-1,(COLS/2)-5);
        addstr("YOU LOSE");
        move((LINES/2),(COLS/2)-8.5);
        printw("%s'S SCORE IS %d",name,score);
        move((LINES),(COLS - 30));
		leaderboard(score, name);
        //fprintf(leaderboard,"NAME : %s SCORE : %d",name,score);
		refresh();
        getch();
    }

    else if(win == 1){
        clear();
        move((LINES/2)-1,(COLS/2)-5);
        addstr("YOU WIN");
        move((LINES/2),(COLS/2)-8.5);
        printw("%s'S SCORE IS %d",name,score);
        //fprintf(leaderboard,"NAME : %s SCORE : %d",name,score); 
        move((LINES),(COLS - 30));
		leaderboard(score, name);
        refresh();
        getch();
    }
    else if(win == 2){
        clear();
        move((LINES/2)-1,(COLS/2)-5);
        printw("BYE %s",name);
        int counter = 0;
        struct leader leaders[5];
        FILE*lb2 = fopen("leaderboard.txt","r");    
        for(int j = 0; j < 5; j++){
            int pos = j+1, tmpscore;
            char tmpname[30];
            int a = fscanf(lb2,"%d. %s %d",&pos,tmpname,&tmpscore);
            if(a == EOF){ 
                break;
            }
            counter++;
            leaders[j].score = tmpscore;
            strcpy(leaders[j].name,tmpname);
        }
        fclose(lb2);
    

        move((LINES/4) ,(COLS-30));
        printw("LEADERBOARD");
        for(int j = 0; j < counter; j++){
            move((LINES/4) + j + 1,(COLS-30));
            printw("%d. %s, SCORE : %d\n",j+1, leaders[j].name, leaders[j].score);
            refresh();
        }
        getch();
     }
    }
void leaderboard(int score, char *name){
    FILE*lb = fopen("leaderboard.txt","r");
    struct leader leaders[6];
    strcpy(leaders[0].name, name);
    leaders[0].score = score;
    int counter = 1;
    bool check = false; 
    if(lb != NULL){
        check = true;
        for(int j = 1; j < 6; j++){
            int pos = j+1, tmpscore;
            char tmpname[30];
            int a = fscanf(lb,"%d. %s %d",&pos,tmpname,&tmpscore);
            if(a == EOF){
                break;
            }
            counter++;
            leaders[j].score = tmpscore;
            strcpy(leaders[j].name,tmpname);

        }   
        fclose(lb);
    }
    FILE*lb1 = fopen("leaderboard.txt","w");
     for(int i = 0; i < counter-1; i++){
       int min_idx = i;
        for(int j = i+1; j < counter; j++){
            if(leaders[j].score > leaders[min_idx].score){
                int buff = leaders[j].score;
                leaders[j].score = leaders[i].score;
                leaders[i].score = buff;
                
                char buff1[30];
                strcpy(buff1, leaders[j].name);
                strcpy(leaders[j].name, leaders[i].name);
                strcpy(leaders[i].name, buff1);
            }
        }
    }
    if(counter > 5){
        counter = 5;
    }
    for(int l = 0; l < counter; l++){
        int pes = l + 1;
        move(LINES+counter,(COLS-30));
        fprintf(lb1,"%d. %s %d\n",pes,leaders[l].name,leaders[l].score);
    }
    fclose(lb1);
    if(check == true){
        counter = 0;
        FILE*lb2 = fopen("leaderboard.txt","r");    
        for(int j = 0; j < 5; j++){
            int pos = j+1, tmpscore;
            char tmpname[30];
            int a = fscanf(lb2,"%d. %s %d",&pos,tmpname,&tmpscore);
            if(a == EOF){
                break;
            }
            counter++;
            leaders[j].score = tmpscore;
            strcpy(leaders[j].name,tmpname);
        }
        fclose(lb2);
    }

    move((LINES/4) ,(COLS-30));
    printw("LEADERBOARD");
    for(int j = 0; j < counter; j++){
        move((LINES/4) + j + 1,(COLS-30));
        printw("%d. %s, SCORE : %d\n",j+1, leaders[j].name, leaders[j].score);
    }
}    
