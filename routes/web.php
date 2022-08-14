<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/{any?}', fn() => view('index'))->where('any', '.+');
/*

例えば /login という URL にアクセスがあったときでも、サーバからは上述のコードの通り index テンプレートを返却します。/login というパスに対応したコンテンツを表示するのはあくまでフロントエンド（特に Vue Router）の役割です。

{any?} で任意のパスパラメータ any を受け入れています。次に where メソッドで正規表現を用いて any パスパラメータの文字列形式を定義していますが、.+ で「任意の文字が一文字以上」つまり「なんでもいい」という指定をしています。

まとめると、any パラメータはあってもなくてもいい（?）し、ある場合はどんな文字列でもいい（.+）ということになります。

この記述によって、すべての URL で index テンプレートを返すことができます。


*/
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
