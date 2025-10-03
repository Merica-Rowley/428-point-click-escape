# 428-point-click-escape

How to get database running locally - 

1. Windows: Download from postgresql.org. Run the installer. You will create a user profile with a password.
Mac: Use Homebrew → brew install postgresql.
Linux (Ubuntu/Debian): sudo apt install postgresql postgresql-contrib

2. Once it's installed, open a terminal (I used powershell). Go to the root directory where your hard drive is and run & "C:\Program Files\PostgreSQL\18\bin\psql.exe" --version. This should show a version of postgres, if it does, you'll know you have postgres properly installed.

3. Run the following line in your command prompt also in the root directory - "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres. This will take you into into the postgres shell where you can run SQL commands.

4. Once in the shell, run this so you will have a local database -
CREATE DATABASE escape_game;
\q

5. Clone the project repo into your codebase (I've provided a migration that you guys can test out to make sure it's working)

6. Run "npm install" to download knex (That's what I used for the migrations)

7. Make a .gitignore, and add .env and .env.local to it. Then, create a file called .env where you put in the following information: 
DB_CLIENT=pg
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=escape_game

8. Run this line in the project root folder "npx knex migrate:latest". This will put the migration I made into your postgres database. This will create an inventory table with a few different columns. 

9. You should be able to query parts of the database from the postgres shell you have set up in the command prompt. You can also install a database GUI for a better visual (I'm using DBeaver).
