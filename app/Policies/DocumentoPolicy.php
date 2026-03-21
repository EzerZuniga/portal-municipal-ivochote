<?php

namespace App\Policies;

use App\Models\Documento;
use App\Models\User;

class DocumentoPolicy
{
    public function view(User $user, Documento $documento): bool
    {
        return $user->isAdmin()
            || $user->isFuncionario()
            || $documento->tramite->ciudadano_id === $user->id;
    }

    public function download(User $user, Documento $documento): bool
    {
        return $this->view($user, $documento);
    }

    public function upload(User $user): bool
    {
        return true;
    }

    public function delete(User $user, Documento $documento): bool
    {
        return $user->isAdmin()
            || $documento->tramite->ciudadano_id === $user->id;
    }
}
