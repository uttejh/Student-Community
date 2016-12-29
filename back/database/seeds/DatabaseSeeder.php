<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	for($i=0;$i<20;$i++)
    	{
        	$this->call(UsersTableSeeder::class);

    	}
    }
}
