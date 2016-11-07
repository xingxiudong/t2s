@echo off

SET arch=%1
if not ""%arch%"" == """" goto gotarch
SET arch=ia32
:gotarch
echo arch: %arch%

cd ./node_modules/ref
call node-gyp configure --arch=%arch%
call node-gyp build

cd ../../

cd ./node_modules/ffi
call node-gyp configure --arch=%arch%node6.9.1
call node-gyp build

cd ../../

pause