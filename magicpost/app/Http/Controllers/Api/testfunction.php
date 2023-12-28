<?php

function findJsonList($jsonlist, $value) {
    $arr = json_decode($jsonlist);
    $key = array_search($value, $arr);
        if ($key) {
            return true;
        } else {
            return false;
        }
    
    
}


echo findJsonList([1, 2, 3, 4], 3);