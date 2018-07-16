
var query = {};
query.config = [{
    "query":"select * from(select \n" +
    "ac.login_name,\n" +
    "if(ac.custom_type='01','普通用户','企业子用户') as 用户类型,\n" +
    "tr.commit_time AS '开始时间',\n" +
    "el.create_time AS '结束时间',\n" +
    "tr.hole_no AS '枪号',\n" +
    "el.charge_electricity AS '电量',\n" +
    "el.charge_fee as '电费',\n" +
    "el.service_fee as '服务费',\n" +
    "el.main_cost as '主账户扣费',\n" +
    "el.trade_task_no as 'trade_task_no',\n" +
    "concat(floor((`el`.`charge_duration` / 3600)),'小时',floor(((`el`.`charge_duration` - (floor((`el`.`charge_duration` / 3600)) * 3600)) / 60)),'分',floor((`el`.`charge_duration` % 60)),'秒') AS `充电时长`,\n" +
    "cpi_p.pile_name AS '桩名称',\n" +
    "(case when (cpi_p.pile_type = '01') then '直流' when (cpi_p.pile_type = '02') then '交流' else 'ERR' end) AS '桩类型',\n" +
    "cpi_s.station_name\n" +
    "from \n" +
    "((((s_trade_task tr left join c_custom ac on((tr.custom_no = ac.custom_no))) \n" +
    "inner join \n" +
    "(select * from s_ele_bill where create_time >= '2018-06-01' and create_time <= '2018-07-01') el \n" +
    "on\n" +
    "((el.trade_task_no = tr.trade_task_no))) \n" +
    "left join \n" +
    "d_charge_pile_info cpi_p \n" +
    "on\n" +
    "((cpi_p.pile_no = tr.pile_no))) \n" +
    "left join \n" +
    "d_charge_station_info cpi_s\n" +
    "on\n" +
    "((cpi_s.station_no = cpi_p.station_no))) \n" +
    "where (tr.trade_status = '02') order by tr.commit_time asc) as abc ",
    "sum":["电费","电量","服务费","主账户扣款"],
    "fileName":"test1"
},{
    "query":"select * from(select \n" +
    "ac.login_name,\n" +
    "if(ac.custom_type='01','普通用户','企业子用户') as 用户类型,\n" +
    "tr.commit_time AS '开始时间',\n" +
    "el.create_time AS '结束时间',\n" +
    "tr.hole_no AS '枪号',\n" +
    "el.charge_electricity AS '电量',\n" +
    "el.charge_fee as '电费',\n" +
    "el.service_fee as '服务费',\n" +
    "el.main_cost as '主账户扣费',\n" +
    "el.trade_task_no as 'trade_task_no',\n" +
    "concat(floor((`el`.`charge_duration` / 3600)),'小时',floor(((`el`.`charge_duration` - (floor((`el`.`charge_duration` / 3600)) * 3600)) / 60)),'分',floor((`el`.`charge_duration` % 60)),'秒') AS `充电时长`,\n" +
    "cpi_p.pile_name AS '桩名称',\n" +
    "(case when (cpi_p.pile_type = '01') then '直流' when (cpi_p.pile_type = '02') then '交流' else 'ERR' end) AS '桩类型',\n" +
    "cpi_s.station_name\n" +
    "from \n" +
    "((((s_trade_task tr left join c_custom ac on((tr.custom_no = ac.custom_no))) \n" +
    "inner join \n" +
    "(select * from s_ele_bill where create_time >= '2018-06-01' and create_time <= '2018-07-01') el \n" +
    "on\n" +
    "((el.trade_task_no = tr.trade_task_no))) \n" +
    "left join \n" +
    "d_charge_pile_info cpi_p \n" +
    "on\n" +
    "((cpi_p.pile_no = tr.pile_no))) \n" +
    "left join \n" +
    "d_charge_station_info cpi_s\n" +
    "on\n" +
    "((cpi_s.station_no = cpi_p.station_no))) \n" +
    "where (tr.trade_status = '02') order by tr.commit_time asc) as abc ",
    "sum":["电费","电量"],
    "fileName":"test2"
}]
module.exports = query;