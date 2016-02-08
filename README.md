# 2048
2048 game
app/  has back end
public/ has front end


app/models   interface for score storage for players in mongo db
app/routes   defines routes for site
public/css/  css files
public/js    js files
      |
      |-components/
            |
            |--- grid/  
                      uses matrices for grid system
                      components/grid-->createGrid(dimension) creates grid
                      grid controller takes control of calculation and gamae logic
                      directive is for DOM event listener
            |--- core/
                      angular service to interact with backend api
            |---- pages/
                    |
                    |--- start/
                              start page of game
                    |--- game/
                              main page of game
                    |--- done/
                              final page of game
            |--- route-config.js
      |
      |--- index.html

