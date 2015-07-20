<?php

require(dirname(__FILE__) . "/../domain/infrastructure/configurations/configuration.php");

date_default_timezone_set('UTC');
$timestamp = date('dMY-His');
$migration_directory_path = __DIR__ . '/../domain/infrastructure/migrations/';
$migration_file_name = $timestamp . ".sql";
$migration_full_file_path = $migration_directory_path . $migration_file_name;

$template = '-- --------------------------------------------------------------------------------
--  Creation Date:  ' . explode('-', $timestamp)[0] . '
-- --------------------------------------------------------------------------------

-- Choose the database.
USE ' . DB_DATABASE . ';

';

for ($i = 0; $i < 75; $i++) {
   $template .= 'SELECT \'group_basic_income\' AS "INSERT INTO";
INSERT INTO group_basic_income
( `name`
, `type`
, `amount`
, `group_id`
, `notes`
, `what_if`
, `created_by`
, `creation_date`
, `last_updated_by`
, `last_update_date`)
VALUES
( \'ISDC ' . ($i + 1) . '\'
, \'Check\'
, 2000
, 2
, \'InsideSales.com check\'
, 0
, 1, UTC_TIMESTAMP()
, 1, UTC_TIMESTAMP());

';
}

file_put_contents($migration_full_file_path, $template);
