<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/getquestions','QuestionCtrl@getques');

Route::get('/gettagquestions','QuestionCtrl@gettagques');

Route::get('/getquestiondet','QuestionCtrl@getquesdet');

Route::post('/postcomment','QuestionCtrl@postcomment');

Route::post('/postanscomment','QuestionCtrl@postanscomment');

Route::post('/postanswer','QuestionCtrl@postanswer');

// Route::get('/showquestion','SaveQuestionCtrl@getq');

Route::post('/askquestion','SaveQuestionCtrl@saveques');

Route::post('/login','LoginCtrl@login');

Route::post('/register','RegisterCtrl@register');

Route::post('/uploadpost','UserCtrl@uploadpost');

Route::get('/gettags','TagsCtrl@gettags');

Route::get('/getnames','UserCtrl@getlist');

Route::post('/addtag','UserCtrl@addtag');

Route::get('/getpapers','UserCtrl@getpapers');