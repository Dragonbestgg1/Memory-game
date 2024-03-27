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
            // add other fields here...
            $user->save();
            return response()->json($user);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
}
