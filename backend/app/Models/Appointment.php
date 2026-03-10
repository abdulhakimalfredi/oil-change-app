<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
        'customer_name',
        'phone',
        'car_type',
        'service_type',
        'appointment_date',
        'appointment_time',
        'status',
        'notes',
    ];
}
