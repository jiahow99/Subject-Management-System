<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SubjectController extends Controller
{
    /**
     * View all subjects
     */
    public function index() {
        // Get all subjects
        $subjects = DB::table('subjects')->get();

        return Inertia::render('Subject/Subjects', [
            'subjects' => $subjects
        ]);
    }

    /**
     * Create subjects
     */
    public function store(CreateSubjectRequest $request) {
        // Get subject from request
        $data = $request->only(['subjects']);

        // Store to database
        $result = DB::table('subjects')->insert($data['subjects']);

        // Show sesssion with message
        $result > 0
            ? session()->flash('success', 'Upload successful')  // Success
            : session()->flash('fail', 'Error uploading subjects'); // Fail
    }

    /**
     * Update subjects
     */
    public function update(UpdateSubjectRequest $request, Subject $subject) {
        // Get subject from request
        $data = $request->only(['form','subject','teacher','topic']);

        // Store to database
        $result = DB::table('subjects')
            ->where('id', $subject->id)
            ->update($data);

        // Show sesssion with message
        $result > 0
            ? session()->flash('success', 'Update successful')  // Success
            : session()->flash('fail', 'Error updating subject'); // Fail
    }

    /**
     * Delete subjects
     */
    public function destroy(Subject $subject) {
        // Delete subject from DB
        $result = DB::table('subjects')
            ->where('id', $subject->id)
            ->delete();

        // Show sesssion with message
        $result > 0
            ? session()->flash('success', 'Deleted successful')  // Success
            : session()->flash('fail', 'Error deleting subject'); // Fail
    }
}
