@echo off
echo.
echo ========================================
echo    儿童识字小报生成器 - 启动服务器
echo ========================================
echo.

REM 检查Python是否安装
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ 使用Python启动服务器...
    echo.
    python start-server.py
    goto end
)

REM 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ 使用Node.js启动服务器...
    echo.
    node start-server.js
    goto end
)

echo ❌ 未找到Python或Node.js
echo.
echo 请安装Python或Node.js来运行本地服务器：
echo - Python: https://www.python.org/downloads/
echo - Node.js: https://nodejs.org/
echo.
echo 或者使用其他HTTP服务器，如：
echo - VS Code的Live Server插件
echo - Python的 http.server 模块
echo - Node.js的 http-server 包

:end
pause