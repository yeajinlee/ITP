----------------------------------------------- 기술
create table tech( 
    no int primary key auto_increment,
    title varchar(100),
    subtitle varchar(100),
    content varchar(1000),
    img varchar(2000));
    
insert into tech values(1,"기술1번제목","기술1번소제목","기술1번내용","https://t1.daumcdn.net/cfile/tistory/24457C4F58663DD011");
insert into tech values(2,"기술2번제목","기술2번소제목","기술2번내용","https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png");
    

--------------------------------------------- 공지사항
create table itp_notice(
    n_no int auto_increment primary key,
    n_title varchar(200) not null,
    n_content varchar(3000) not null,
    n_date datetime );
    
insert into itp_notice values(1,"알려드립니다","공지사항입니다",now());
insert into itp_notice values(2,"사이트 점검안내","2022년 3월 18일~19일 점검 예쩡입니다.",now());itp_member
insert into itp_notice values(3,'개인정보취급방침 개정안내','개인정보취급방침이 개정되었습니다. 하단 메뉴를 통해 확인하세요',now());
insert into itp_notice values(4,'IT뉴스 요약기능이 추가되었습니다','IT뉴스 요약기능이 추가되었습니다',now());

insert into itp_notice values(1,"공지사항제목1","공지사항입니다",now());
insert into itp_notice values(2,"공지사항제목2","공지드립니다",now());
    

--------------------------------------------------------- 모임찾기   
create table itp_group(
    g_no int primary key auto_increment not null,
    g_name varchar(200) not null,
    g_title varchar(200) not null,
    g_subtitle varchar(200) not null,
    g_content varchar(3000) not null,
    g_img varchar(3000) not null,
    g_tag varchar(200) not null );
    
insert into itp_group values(1,'김자바','java프로젝트 구해요!','초보자도 환영합니다!','java프로젝트 중급 1명 초급1명 구하고 있습니다.','https://blog.kakaocdn.net/dn/cZsyTw/btq0u5VBWge/F7xmauYA6r8nnbXSz2vJhK/img.png','프로젝트');
insert into itp_group values(2,'dddd','프로젝트 구해요!','같이 화이팅해요!','java프로젝트구합니다.','https://blog.kakaocdn.net/dn/cZsyTw/btq0u5VBWge/F7xmauYA6r8nnbXSz2vJhK/img.png','프로젝트');
insert into itp_group values(3,'gggg','프로젝트 구해요!','같이 화이팅해요!','java프로젝트구합니다.','https://blog.kakaocdn.net/dn/cZsyTw/btq0u5VBWge/F7xmauYA6r8nnbXSz2vJhK/img.png','프로젝트');
insert into itp_group values(4,'bbbb','함께해요!','같이 화이팅해요!','java프로젝트구합니다.','https://blog.kakaocdn.net/dn/cZsyTw/btq0u5VBWge/F7xmauYA6r8nnbXSz2vJhK/img.png','프로젝트');
insert into itp_group values(5,'sksksk','프로젝트 구해요!','같이 화이팅해요!','java프로젝트구합니다.','https://blog.kakaocdn.net/dn/cZsyTw/btq0u5VBWge/F7xmauYA6r8nnbXSz2vJhK/img.png','프로젝트');
insert into itp_group values(6,'ㄱㄱㄱ','화이팅!','같이 화이팅해요!','java프로젝트구합니다.','https://blog.kakaocdn.net/dn/cZsyTw/btq0u5VBWge/F7xmauYA6r8nnbXSz2vJhK/img.png','프로젝트');
insert into itp_group values(7,'ㅠㅠㅠ','프로젝트 구해요!','같이 화이팅해요!','java프로젝트구합니다.','https://blog.kakaocdn.net/dn/cZsyTw/btq0u5VBWge/F7xmauYA6r8nnbXSz2vJhK/img.png','프로젝트');


---------------------------------------------- 사용자
create table itp_member (
  m_name varchar(200) primary key,
  m_email varchar(300) not null,
  m_passwd varchar(300) not null,
  m_date datetime default now(),
  m_role int default 1 
);

insert itp_member values ("manager", "itpmanager@naver.com", "itp123", default , 0);
insert itp_member values ("abc", "abc@naver.com", "abc123", default, default);


-------------------------------------------- 소통공간
create table itp_com(
c_no int primary key auto_increment,
c_name varchar(200) not null,
c_title varchar(200) not null,
c_content varchar(3000) not null,
c_date datetime default now()
);
insert into itp_com values(1,'abc','소통곤간글1','소통공간내용1',default);
insert into itp_com values(2,'bbb','소통공간글2','소통공간내용1',default);
insert into itp_com values(3,'가가가','소통공간글3','소통공간내용1',default);
insert into itp_com values(4,'dji','소통공간글4','소통공간내용1',default);
insert into itp_com values(5,'bkd','소통공간글5','소통공간내용1',default);
insert into itp_com values(6,'qqq','소통공간글6','소통공간내용1',default);
insert into itp_com values(7,'nnn','소통공간글7','소통공간내용1',default);
insert into itp_com values(8,'pan','소통공간글8','소통공간내용1',default);


-------------------------------------------------- 소통공간 댓글
create table itp_reply(
r_rno int primary key auto_increment,
r_no int not null,
r_content varchar(3000) not null,
r_name varchar(200) not null,
r_date datetime default now(),
foreign key(r_rno) references itp_com(c_no) on DELETE CASCADE);

-------------------------------------------------- 모임찾기

insert into itp_reply values(1,1,'1번글댓글','aaa',default);
insert into itp_reply values(2,2,'1번댓글2','bbb',default);
insert into itp_reply values(3,1,'1번댓글2','bbb',default);
insert into itp_reply values(4,5,'1번댓글2','ccc',default);
insert into itp_reply values(5,6,'1번댓글2','eee',default);

create table itp_replygroup(
rg_rno int primary key auto_increment,
rg_no int not null,
rg_content varchar(3000) not null,
rg_name varchar(200) not null,
rg_date date default(current_date),
foreign key(rg_rno) references itp_group(g_no) on DELETE CASCADE);


insert into itp_replygroup values(1,1,'1번글댓글','aaa',default);
insert into itp_replygroup values(2,2,'2번댓글2','bbb',default);
insert into itp_replygroup values(3,7,'댓굴추가','ccc',default);
create table itp_tech( 
    t_no int primary key auto_increment,
    t_parentno int not null default 0,
    t_tag varchar(100) not null,
    t_name varchar(200) not null,
    t_content varchar(1000) not null,
    t_date date default (current_date)
    );
    
insert into itp_tech values(1, default,  "React","Carrie","리액트", default);
insert into itp_tech values(2, default, "Spring","Dennis","스프링", default);
insert into itp_tech values(3, default, "Vue","Maple","뷰", default);
insert into itp_tech values(4, default, "Vue","Maple","뷰2", default);
insert into itp_tech values(5, default, "React","Ryan","리액트2", default);
insert into itp_tech values(6, default, "Spring","Kale","스프링2", default);
-- 커밋
commit;



-- 셀렉트 ---------------------
select * from tech;
select * from itp_notice;
select * from itp_group;
select * from itp_member;
select * from itp_com;
select * from itp_reply;


select * from tech where no="1";    
select count(*) from itp_group;
select * from itp_group where g_no between (select count(*) from itp_group)-3 and (select count(*) from itp_group);
select c.*,r.* from itp_com c right outer join  itp_reply r on c.c_no=r.r_no;
-- 셀렉트 ----------------------



-- !! 드롭 !! -----------------
drop table itp_member;
drop table tech;
drop table itp_notice;
drop table itp_group;
drop table itp_com;
drop table itp_reply;
drop table itp_replygroup
-- !! 드롭 !! ---------------------