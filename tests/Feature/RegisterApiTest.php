<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;

class RegisterApiTest extends TestCase
{
    use RefreshDatabase;
/*

ログインユーザーテスト　assertメソッドの解説
https://qiita.com/nakano-shingo/items/1ab4658e0c8a965de796

実装の意図：
デフォルトの挙動では登録成功後には定義されたページにリダイレクトするレスポンスを返しますが、今回は SPA なのでいつどのページに遷移するかはフロントエンドでコントロールします。
そのため、登録成功後は登録ユーザーの情報を返却させることにします。そうすれば返却されたユーザーデータをフロントエンドで保存しておいて認証状態のチェックなどに使えます。

*/
    /**
     * @test
     */
    public function should_新しいユーザーを作成して返却する()
    {
        $data = [
            'name' => 'vuesplash user',
            'email' => 'dummy@email.com',
            'password' => 'test1234',
            'password_confirmation' => 'test1234',
        ];

        $response = $this->json('POST', route('register'), $data);

        $user = User::first();
// Log::debug($user);
        $this->assertEquals($data['name'], $user->name);

        $response
            ->assertStatus(201)
            ->assertJson(['name' => $user->name]);
    }
}