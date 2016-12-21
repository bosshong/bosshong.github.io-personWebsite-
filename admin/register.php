<?php
     require_once('config.php');
     $con=mysql_connect(HOST,USERNAME,PASSWORD);
     mysql_select_db('db123');
     mysql_query('set names utf8');

     $text=$_POST['text'];
     $password=$_POST['password'];
     $num=$_POST['num'];
     $email=$_POST['email'];
     $radio=$_POST['radio'];


    $insertsql="insert into p_register(username,password,number,email,sex) values('$text','$password','$num','$email','$radio')";
    $requery=mysql_query($insertsql);
    if($requery){
       echo "注册成功";
    }else{
       echo "注册失败";
    }

   mysql_close($con);

?>