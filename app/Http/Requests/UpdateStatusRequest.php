<?php

namespace App\Http\Requests;

use App\Enums\TramiteStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = $this->user();

        return $user !== null && ($user->isFuncionario() || $user->isAdmin());
    }

    public function rules(): array
    {
        return [
            'status'      => ['required', Rule::enum(TramiteStatus::class)],
            'observacion' => 'nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'status.required' => 'El estado es obligatorio.',
            'status.enum'     => 'El estado proporcionado no es válido.',
        ];
    }
}
