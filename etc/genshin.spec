%define project_ver %(echo $RPM_VERSION)
%define project_rel %(echo ${RPM_RELEASE:-1})
%define source_path /home/genshin/data

Name: gicalc
Version: %{project_ver}
Release: %{project_rel}
Summary: Genshin Impact Calculator
BuildRoot: %{_tmppath}/%{name}-buildroot
URL: https://genshin.aspirine.su/
BuildArch: noarch
License: Proprietary

%package nginx
Summary: Genshin Impact Calculator nginx frontend
BuildArch: noarch
License: Proprietary
Requires: nginx
Requires: logrotate

%description
Genshin Impact Calculator

%description nginx
Genshin Impact Calculator nginx frontend

%prep

cd %{_builddir}
%{__rm} -rf %{name}-%{version}
%{__mkdir_p} %{name}-%{version}

%{__cp} -pR %{source_path}/bin      %{name}-%{version}/
%{__cp} -pR %{source_path}/data     %{name}-%{version}/
%{__cp} -pR %{source_path}/etc      %{name}-%{version}/
%{__cp} -pR %{source_path}/src      %{name}-%{version}/
%{__cp} -pR %{source_path}/test     %{name}-%{version}/
%{__cp} -pR %{source_path}/package* %{name}-%{version}/
%{__cp} -pR %{source_path}/babel-*  %{name}-%{version}/
%{__cp} -pR %{source_path}/webpack* %{name}-%{version}/
%build

cd %{_builddir}/%{name}-%{version}
npm ci
npm run test
npm run build

%install

%{__rm} -rf %{buildroot}

%{__mkdir_p} %{buildroot}/home/sites/genshin/calc/
%{__mkdir_p} %{buildroot}%{_sysconfdir}/nginx/conf.d
%{__mkdir_p} %{buildroot}%{_sysconfdir}/systemd/system/

%{__cp} -pR  %{_builddir}/%{name}-%{version}/dist/*      %{buildroot}/home/sites/genshin/calc/

%{__mkdir_p} %{buildroot}%{_sysconfdir}/logrotate.d
%{__install} -p -m 644 %{_builddir}/%{name}-%{version}/etc/logrotate.conf    %{buildroot}%{_sysconfdir}/logrotate.d/genshin-calc

%{__install} -p -m 644 %{_builddir}/%{name}-%{version}/etc/nginx/00-genshin-upstream.conf   %{buildroot}%{_sysconfdir}/nginx/conf.d/00-genshin-upstream.conf
%{__install} -p -m 644 %{_builddir}/%{name}-%{version}/etc/nginx/genshin-calc.conf          %{buildroot}%{_sysconfdir}/nginx/conf.d/genshin-calc.conf
%{__install} -p -m 644 %{_builddir}/%{name}-%{version}/etc/nginx/genshin-calc.http.conf     %{buildroot}%{_sysconfdir}/nginx/conf.d/genshin-calc.http.conf
%{__install} -p -m 644 %{_builddir}/%{name}-%{version}/etc/nginx/genshin-calc.host          %{buildroot}%{_sysconfdir}/nginx/conf.d/genshin-calc.host
%{__install} -p -m 644 %{_builddir}/%{name}-%{version}/etc/nginx/genshin-calc.ssl.include   %{buildroot}%{_sysconfdir}/nginx/conf.d/genshin-calc.ssl.include

%{__mkdir_p} %{buildroot}/var/log/nginx/genshin/

exit 0

%clean
%{__rm} -rf %{_builddir}/%{name}-%{version}

%pre
groupadd -f -g 5000 -r w3genshin
getent passwd w3genshin >/dev/null || \
useradd -r -u 5000 -g w3genshin -s /bin/bash -d /home/sites/genshin -c "" w3genshin

exit 0


%files
%defattr(-,w3genshin,w3genshin,-)
/home/sites/genshin/calc/


%files nginx
%attr(-,root,root)  %config(noreplace)  %{_sysconfdir}/nginx/conf.d/00-genshin-upstream.conf
%attr(-,root,root)                      %{_sysconfdir}/nginx/conf.d/genshin-calc.conf
%attr(-,root,root)  %config(noreplace)  %{_sysconfdir}/nginx/conf.d/genshin-calc.http.conf
%attr(-,root,root)  %config(noreplace)  %{_sysconfdir}/nginx/conf.d/genshin-calc.ssl.include
%attr(-,root,root)  %config(noreplace)  %{_sysconfdir}/nginx/conf.d/genshin-calc.host
%attr(-,root,root)                      %{_sysconfdir}/logrotate.d/genshin-calc
%attr(775,root,nginx) %dir /var/log/nginx/genshin/
