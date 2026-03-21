<?php

namespace App\Policies;

use App\Models\Tramite;
use App\Models\User;

class TramitePolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Tramite $tramite): bool
    {
        return $user->isAdmin()
            || $user->isFuncionario()
            || $tramite->ciudadano_id === $user->id;
    }

    public function create(User $user): bool
    {
        return $user->isCiudadano();
    }

    public function update(User $user, Tramite $tramite): bool
    {
        return $user->isAdmin()
            || ($user->isCiudadano() && $tramite->ciudadano_id === $user->id && $tramite->isPending());
    }

    public function updateStatus(User $user, Tramite $tramite): bool
    {
        return $user->isFuncionario() || $user->isAdmin();
    }

    public function delete(User $user, Tramite $tramite): bool
    {
        return $user->isAdmin();
    }
}
