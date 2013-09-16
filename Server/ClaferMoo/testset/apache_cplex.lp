\Problem name: apache_cplex.lp

Maximize
 obj: total_performance
Subject To
 c1: Base = 1
 c2: InMemory = 1 -> Handle = 0 
 c3: IsTrueHandle || IsTrueHostnameLookups 
 c4: 150 Base -26 HostnameLookups +105 KeepAlive +15 EnableSendfile +0 FollowSymLinks -15 AccessLog -11 ExtendedStatus +26 InMemory +4 Handle - total_performance = 0
Bounds
	total_performance <= 350
Integer
	total_performance
	IsTrueHandle 
	IsTrueHostnameLookups
	Base 
	HostnameLookups
	KeepAlive
	EnableSendfile
	FollowSymLinks
	AccessLog
	ExtendedStatus
	InMemory
	Handle
End