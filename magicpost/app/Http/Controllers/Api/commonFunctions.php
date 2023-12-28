<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class commonFunctions extends Controller
{
    public function appendToJsonList($jsonlist, $value) {
        $arr = json_decode($jsonlist);
        array_push($arr, $value);
        return json_encode(array_values($arr));
    }

    public function removeFromJsonList($jsonlist, $value) {
        $arr = json_decode($jsonlist);
        for ($i = 0; $i < sizeof($arr); $i++) {
            if ($arr[$i] == $value) {
                unset($arr[$i]);
                break;
            }
        }
        $jsonarr = json_encode(array_values($arr));
        return $jsonarr;
    }

    public function findJsonList($jsonlist, $value) {
        $arr = json_decode($jsonlist);
        $key = array_search($value, $arr);
            if ($key) {
                return true;
            } else {
                return false;
            }
        
        
    }
}
