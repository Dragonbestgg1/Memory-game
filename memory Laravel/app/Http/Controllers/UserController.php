<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $user = new User;
        $user->username = $request->username;
        $user->password = Hash::make($request->password);
        $user->email = $request->email;
        // add other fields here...
        $user->save();

        return response()->json(['message' => 'User created successfully'], 201);
    }

    public function show(string $id)
    {
        $user = User::find($id);
        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        if ($user) {
            if ($request->has('username')) {
                $user->username = $request->input('username');
            }
            if ($request->has('password')) {
                $user->password = Hash::make($request->input('password'));
            }
            if ($request->has('email')) {
                $user->email = $request->input('email');
            }
            $user->save();
            return response()->json($user);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }    
    public function login(Request $request)
    {
        $field = filter_var($request->input('login'), FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        $user = User::where($field, $request->input('login'))->first();
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid password'], 401);
        }
    
        // Here you should generate a token for the user and send it as a response
        // This token will be used for authentication in subsequent requests
    
        return response()->json($user);
    }
    

}
