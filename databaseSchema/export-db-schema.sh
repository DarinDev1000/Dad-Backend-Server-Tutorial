#!/bin/bash
GIT_MYSQL=./schema
for T in `mysql -u export -p123 -N -B -e 'show tables from \`dad-backend-server-tutorial\`'`;
do
    echo Backing up $T
    mysqldump --single-transaction --skip-comments --no-data --skip-add-drop-table -u export -p123 dad-backend-server-tutorial $T | sed 's/ AUTO_INCREMENT=[0-9]*//g' > $GIT_MYSQL/tables/$T.sql
done;

mysqldump --single-transaction --no-data --skip-add-drop-table -u export -p123 dad-backend-server-tutorial | sed 's/ AUTO_INCREMENT=[0-9]*//g' > $GIT_MYSQL/dad-backend-server-tutorial-schema-all-tables.sql
