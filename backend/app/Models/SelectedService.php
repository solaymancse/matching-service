<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SelectedService extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'service_id',
    ];
    public function user()
    {
        return $this->hasOne(User::class,'id','user_id');
    }
    public function service()
    {
        return $this->belongsTo(ServiceName::class,'service_id');
    }
    
}