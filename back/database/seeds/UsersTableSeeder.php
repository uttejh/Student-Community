<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'username' => str_random(10),
            'email' => str_random(10).'@gmail.com',
            'password' => '111111',
            'role' => '2',
            'token' => str_random(15).str_random(10)
        ]);
    }
}
