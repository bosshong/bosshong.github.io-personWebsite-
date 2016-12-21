<?php
   require_once('config.php');
   $con=mysql_connect(HOST,USERNAME,PASSWORD);
   mysql_select_db('db123');
   mysql_query('set names utf8');

       $textarea=$_POST['textarea'];

      $insertsql="insert into p_textarea(textarea) values('$textarea')";
      $requery=mysql_query($insertsql);
      if($requery){
         echo "提交成功";
      }else{
         echo "提交失败";
      }

     mysql_close($con);





?>