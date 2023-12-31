<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parcel extends Model
{
    use HasFactory;

    protected $table = 'parcel';

    protected $fillable = [
        // 'officeID',
        'code',
        'senderName',
        'senderPhone',
        'senderAddress',
        'sendOfficeID',
        'receiverName',
        'receiverPhone',
        'receiverAddress',
        'receivOfficeID',
        'trace',
        'status'
    ];

}
