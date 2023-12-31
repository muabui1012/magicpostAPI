<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    use HasFactory;

    protected $table = 'userdetail';

    protected $fillable = [
        'userid',
        'roleid',
        'department_type',
        'departmentid'
    ];
}
