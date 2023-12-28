<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    use HasFactory;
    protected $table = 'office';


    //nhận từ khách -> parcelist -> gửi cho warehouse(outgoingcomingFromWarehouse)
    //nhận từ warehouse(incomingfromwarehouse) 
    protected $fillable=[
        'name',
        'managerid',
        'staffList',
        'incomingFromCustomer',
        'incomingFromWarehouse',
        'outgoingToWarehouse',
        'outgoingToCustomer',
        'failed',
    ];

}
