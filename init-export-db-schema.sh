#!/bin/bash
echo "********************"
echo
echo "This script initializes a new dbSchema export in this project"
echo "It exports the database schema from localhost with the mysql and mysqldump cli tools"
echo
echo "You may want to make a new database user named 'export' with the correct permissions"
echo "permissions example:     mysql> GRANT SELECT,LOCK TABLES ON DBNAME.* TO 'username'@'localhost';"
echo
echo "------WARNING------"
echo
echo "Currently, this script exposes your local development database password in your git history!"
echo
echo "-------------------"

echo "**** If you accept, press ENTER ****"
    read ACCEPT

DIRECTORY=databaseSchema
if [ -d "$DIRECTORY" ]; then
    echo "The databaseSchema folder already exists"
else
    mkdir databaseSchema
    mkdir databaseSchema/schema
    mkdir databaseSchema/schema/tables
    cd    databaseSchema

    echo "Database name: "
    read DATABASE_NAME
    # echo $DATABASE_NAME
    echo "------"

    echo "Username: "
    read USER_NAME
    # echo $USER_NAME
    echo "------"

    echo "Password: "
    read PASSWORD
    # echo $PASSWORD
    echo "------"

    echo "#!/bin/bash" > export-db-schema.sh
    echo "GIT_MYSQL=./schema" >> export-db-schema.sh
    echo "for T in \`mysql -u $USER_NAME -p$PASSWORD -N -B -e 'show tables from \\\`$DATABASE_NAME\\\`'\`;" >> export-db-schema.sh
    echo "do" >> export-db-schema.sh
    echo "    echo Backing up \$T" >> export-db-schema.sh
    echo "    mysqldump --single-transaction --skip-comments --no-data --skip-add-drop-table -u $USER_NAME -p$PASSWORD $DATABASE_NAME \$T | sed 's/ AUTO_INCREMENT=[0-9]*//g' > \$GIT_MYSQL/tables/\$T.sql" >> export-db-schema.sh
    echo "done;" >> export-db-schema.sh
    echo "" >> export-db-schema.sh
    echo "mysqldump --single-transaction --no-data --skip-add-drop-table -u $USER_NAME -p$PASSWORD $DATABASE_NAME | sed 's/ AUTO_INCREMENT=[0-9]*//g' > \$GIT_MYSQL/$DATABASE_NAME-schema-all-tables.sql" >> export-db-schema.sh

    chmod +x export-db-schema.sh
fi

echo ---------------------------
echo Remember to add:
echo
echo '"export-db-schema": "cd databaseSchema && ./export-db-schema.sh"'
echo
echo to your package.json scripts and run it when the database changes.
echo ---------------------------
echo
echo "run 'npm run export-db-schema' to export the database schema"
echo
echo ---------------------------