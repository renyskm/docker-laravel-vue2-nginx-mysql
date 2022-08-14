<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// API
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// ログインユーザー
Route::get('/user', fn() => Auth::user())->name('user');

// ログイン 
Route::post('/login', 'Auth\LoginController@login')->name('login');

// ログアウト
Route::post('/logout', 'Auth\LoginController@logout')->name('logout');

// 会員登録
Route::post('/register', 'Auth\RegisterController@register')->name('register');

// 写真投稿
Route::post('/photos', 'PhotoController@create')->name('photo.create');