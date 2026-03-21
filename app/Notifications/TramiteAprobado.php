<?php

namespace App\Notifications;

use App\Models\Tramite;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TramiteAprobado extends Notification
{
    use Queueable;

    public function __construct(private readonly Tramite $tramite) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('¡Tu trámite #'.$this->tramite->id.' ha sido aprobado!')
            ->greeting('¡Felicitaciones, '.$notifiable->name.'!')
            ->line('Nos complace informarte que tu trámite ha sido aprobado.')
            ->line('Procedimiento: '.$this->tramite->procedimiento->nombre)
            ->action('Ver detalles', url('/tramites/'.$this->tramite->id))
            ->line('Gracias por confiar en la Municipalidad de Megantoni.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'tramite_id' => $this->tramite->id,
            'message' => '¡Tu trámite ha sido aprobado!',
        ];
    }
}
