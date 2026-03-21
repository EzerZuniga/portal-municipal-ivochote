<?php

namespace App\Notifications;

use App\Enums\TramiteStatus;
use App\Models\Tramite;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TramiteStatusChanged extends Notification
{
    use Queueable;

    public function __construct(
        private readonly Tramite       $tramite,
        private readonly TramiteStatus $oldStatus
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Cambio de estado en tu trámite #' . $this->tramite->id)
            ->greeting('Hola, ' . $notifiable->name)
            ->line('El estado de tu trámite ha cambiado.')
            ->line('Estado anterior: ' . $this->oldStatus->label())
            ->line('Estado actual: ' . $this->tramite->status->label())
            ->action('Ver trámite', url('/tramites/' . $this->tramite->id))
            ->line('Gracias por usar nuestros servicios.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'tramite_id' => $this->tramite->id,
            'old_status' => $this->oldStatus->value,
            'new_status' => $this->tramite->status->value,
            'message'    => 'Estado del trámite actualizado a: ' . $this->tramite->status->label(),
        ];
    }
}
