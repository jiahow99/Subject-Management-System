## Prerequisites
- PHP (version 7.4 or higher)
- Composer
- MySQL (or another database system)
- Node.js and npm
  
## Installation
1. run "git clone https://github.com/jiahow99/Subject-Management-System"
2. cd into the folder
3. run "composer install"
4. run "npm install"
5. run "php artisan key:generate"
6. run "cp .env.example .env"

## Migration
1. Create database with name "user_management_app"
2. Change DB_DATABASE in .env to "user_management_app"
3. run "php artisan migrate"

## Local Development
1. run "php artisan serve"
2. run "npm run dev"

## Start using the system
1. Register account
2. Import data with .txt file
3. Manage under "Subjects" tab
4. Create user under "Users" tab
5. Manage user under "Users" tab

