<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Parcel;

class Warehouse extends Model
{
    use HasFactory;
    protected $table = 'warehouse';
    protected $fillable=[
        'managerid',
        'name',
        'officeID',
        'staffList',
        //'parceList',
        'incomingFromOffice',
        'incomingFromOtherWarehouse',
        'outgoingToOtherWarehouse',
        'outgoingToOffice'
    ];
}
