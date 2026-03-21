<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Notifications\Notification;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendNotificacionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    public int $backoff = 60;

    /**
     * @param  class-string<Notification>  $notificationClass
     * @param  array<string, mixed>  $notificationData
     */
    public function __construct(
        private readonly User $user,
        private readonly string $notificationClass,
        private readonly array $notificationData = []
    ) {}

    public function handle(): void
    {
        /** @var Notification $notification */
        $notification = new $this->notificationClass(...array_values($this->notificationData));

        $this->user->notify($notification);

        Log::info('Notificación enviada', [
            'user_id' => $this->user->id,
            'notification' => $this->notificationClass,
        ]);
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('Error al enviar notificación', [
            'user_id' => $this->user->id,
            'error' => $exception->getMessage(),
        ]);
    }
}
