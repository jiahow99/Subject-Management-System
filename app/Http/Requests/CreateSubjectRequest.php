<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateSubjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'subjects' => 'required|array',
            'subjects.*.form' => 'required|string|max:255',
            'subjects.*.subject' => 'required|string|max:255',
            'subjects.*.teacher' => 'required|string|max:255',
            'subjects.*.topic' => 'required|string|max:255',
        ];
    }
}
