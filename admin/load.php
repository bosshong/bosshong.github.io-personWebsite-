<?php
   require_once('config.php');
   $con=mysql_connect(HOST,USERNAME,PASSWORD);
   mysql_select_db('db123');
   mysql_query('set names utf8');

   $user=$_POST['user'];
   $pass=$_POST['pass'];

   $a="select * from p_load";
   $query=mysql_query($a);
   $isAuthorized = false;
    while($row = mysql_fetch_array($query))
   {
      if($user==$row[1] && $pass==$row[2]){
         $isAuthorized = true;
      }
   }

   if($isAuthorized != false) {
      echo "登录成功";
   } else {
      echo "登录失败";
   }

   mysql_close($con);
?>