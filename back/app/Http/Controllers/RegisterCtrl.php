<?php 
namespace App\Http\Controllers;
use Illuminate\Http\Request;
// use Request;
use Response;
use App\Users;
use Illuminate\Database\Eloquent\Model;
// use App\Http\Middleware\VerifyCsrfToken;

// use App\Http\Requests;

class RegisterCtrl extends Controller
{
    public function register(Request $details){
    	// $details = Request::all();

    	$this->validate($details, [
	        'username' => 'required|unique:users|max:255',
	        'email' => 'required|unique:users',
	        'password' =>'required',
	        
	    ]);

	    $username = $details['username'];
		$email = $details['email'];

	    $password = md5($details['password']);
	    $confirmpassword = md5($details['passwordConfirmation']);

	    $time = microtime(true);

	    $token =$username.$password.$time;

	    if( (!empty($details['password'])) && ($password == $confirmpassword))
	    {
	    	$user = new Users;
	    	$user->username = $username;
	    	$user->email = $email;
	    	$user->password = $password;
	    	$user->token = $token;
	    	$user->role = 2;

	    	$user->save();
	    	// return 'User Successfully Created!';
	    	return array('User Successfully Created!',$token,$username);
	    }
	    else
	    {
	    	return "Looks like there's something wrong!";
	    } ;
    
	}
}