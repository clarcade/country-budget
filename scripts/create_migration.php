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

file_put_contents($migration_full_file_path, $template);
