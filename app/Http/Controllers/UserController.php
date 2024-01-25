<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display all users.
     */
    public function index()
    {
        // Get all users
        $users = User::all();

        return Inertia::render('User/Users', [
            'users' => $users,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateUserRequest $request)
    {
        // Get data from request and hash password
        $data = $request->except('confirmPassword');
        $data['password'] = Hash::make($request->password);

        // Create user
        $result = DB::table('users')->insert($data);

        // If success, show message
        // If fail, show error
        $result > 0 
            ? session()->flash('success', "Created user $request->name")
            : session()->flash('fail', "Error creating user");
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('User/Edit', [
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        // Data
        $data = $request->only(['name','email','password']);

        // Hash password
        $data['password'] = Hash::make($data['password']);

        // Update 
        $result = DB::table('users')
            ->where('id', $user->id)
            ->update($data);

        // If success, show message
        // If fail, show error
        $result > 0
            ? session()->flash('success', 'User updated successfully') 
            : session()->flash('fail', 'Something went wrong. Please try again later'); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // Delete
        $result = DB::table('users')
            ->where('id', $user->id)
            ->delete();

        // If success, show message
        // If fail, show error
        $result
            ? session()->flash('success', "User $user->name deleted successfully")
            : session()->flash('fail', 'Something went wrong');
    }
}
