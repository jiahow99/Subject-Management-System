<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware('auth')->name('dashboard');

// Authenticated route
Route::middleware('auth')->group(function () {
    // Users
    Route::resource('user', UserController::class);

    // Subjects
    Route::get('/subject', [SubjectController::class, 'index'])->name('subject.index');
    Route::post('/subject', [SubjectController::class, 'store'])->name('subject.store');
    Route::put('/subject/{subject}/update', [SubjectController::class, 'update'])->name('subject.update');
    Route::delete('/subject/{subject}/delete', [SubjectController::class, 'destroy'])->name('subject.destroy');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
