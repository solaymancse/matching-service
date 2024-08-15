<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceName extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_name',
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'selected_service_id');
    }
}
