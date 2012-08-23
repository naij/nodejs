npm，全称是"node package manager"，它是node包管理器。这个我们已经用过很多次了，第三方的package全是通过npm去安装的。JavaScript从诞生开始就带有一些天生的缺陷，基本各种版本的JavaScript的实现都只内置简单的原生类型和对象，别的功能基本都是利用浏览器提供的对象和接口。特别的一点就是没有模块，没有包的管理，甚至都没有提供标准库。随着服务端JavaScript的日益盛行，为了大规模使用JavaScript，CommonJS规范出现了，目标是提供JavaScript的标准库规范，CommonJS定义了API来处理通用程序需要的各种功能，比如文件系统访问，进程处理，加密，模块管理，命令行输出等等。CommonJS力图构建JavaScript在包括服务器方面，桌面程序，命令行工具，及浏览器方面的生态系统。而node.js就是这些规范的一种实现。

#一、模块与包的概念

在node.js中，模块与包基本上是一样的。我个人认为模块更强调是单个的文件，有向外的接口，提供服务；包则是由一组具有依赖性，内聚的模块组织成的一种混合结构。广义上的模块，应该就是包了。这里就不详细区分它们的区别，不妨认为在node.js中，安装使用的那个是包，引用时使用的那个是模块吧。

#二、node的包管理

npm是基于CommonJS定义的包规范，实现了依赖管理和模块自动安装等功能。除了node内置的核心模块外，其他包的安装、卸载等管理操作都要通过npm 来进行。当然我们自己也可以写模块，然后发布到npm上来供其他人使用。

<br>
##包的结构

基本上，一个包就是一个典型一个文件夹结构，这个文件夹包括一个package.json文件，和完成各种功能的模块文件。一个符合CommonJS规范的包应该是如下这种结构：

* 一个package.json文件应该存在于包顶级目录下;
* 二进制文件应该包含在bin目录下;
* JavaScript代码应该包含在lib目录下;
* 文档应该在doc目录下;
* 单元测试应该在test目录下。

npm命令运行时会读取当前目录的package.json文件和解释这个文件，这个文件基于 Packages/1.1 规范(参见最后实用参考部分)。在这个文件里你可以定义你的模块的相关信息，比如名称(name)、应用描述(description)、版本号(version)、应用的配置项(config)、作者(author)、资源仓库地址(repository)、授权方式(licenses)、目录(directories)、应用入口文件(main)、命令行文件(bin)、应用依赖模块(dependencies)、开发环境依赖模块(devDependencies)、运行引擎(engines)和脚本(scripts)等。例如下面的express模块的package.json文件：

    {
        "name": "express",
        "description": "Sinatra inspired web development framework",
        "version": "2.5.6",
        "author": "TJ Holowaychuk <tj@vision-media.ca>",
        "contributors": [ 
            { "name": "TJ Holowaychuk", "email": "tj@vision-media.ca" }, 
            { "name": "Aaron Heckmann", "email": "aaron.heckmann+github@gmail.com" },
            { "name": "Ciaran Jessup", "email": "ciaranj@gmail.com" },
            { "name": "Guillermo Rauch", "email": "rauchg@gmail.com" }
        ],
        "dependencies": {
            "connect": "1.x",
            "mime": ">= 0.0.1",
            "qs": ">= 0.3.1",
            "mkdirp": "0.0.7"
        },
        "devDependencies": {
            "connect-form": "0.2.1",
            "ejs": "0.4.2",
            "expresso": "0.9.2",
            "hamljs": "0.6.x",
            "jade": "0.16.2",
            "stylus": "0.13.0",
            "should": "0.3.2",
            "express-messages": "0.0.2",
            "node-markdown": ">= 0.0.1",
            "connect-redis": ">= 0.0.1"
        },
        "keywords": ["framework", "sinatra", "web", "rest", "restful"],
        "repository": "git://github.com/visionmedia/express",
        "main": "index",
        "bin": { "express": "./bin/express" },
        "scripts": {
            "test": "make test",
            "prepublish" : "npm prune"
        },
        "engines": { "node": ">= 0.4.1 < 0.7.0" }
    }

这些信息都比较简单，能很容易看懂里面的内容，比较重要的信息如main指定了当我们引用express模块的时候(`require('express')`)，先要调用与package.json处于同目录中index.js文件；engines指定了运行的引擎版本；scripts指定了在运行相关命令时实际执行的文件或命令。例如下面是一个比较全面的scripts：

    "scripts": {
        "install": "install.js",
        "uninstall": "uninstall.js",
        "start": "node --debug server.js",
        "build": "build.js",
        "doc": "make-doc.js",
        "test": "test.js",
    }

这个脚本说明在执行npm start的时候，实际执行node -- debug server.js命令；执行npm install的时候，执行install.js文件；其它以此类推。

需要注意的是，包是这样一个结构，但是在安装的时候，呈现的形式却是不同的，具体参见install命令的各种变体。 

<br>
##在命令行中使用npm进行包管理

安装完node.js以后，就可以在命令行中使用npm了。常用的npm命令如下：

**install**：安装以各种形式组织成包，比如本地的，网络上。具体参看install的命令说明http://npmjs.org/doc/install.html。

安装包分两种模式：

全局模式，也就是带上参数 -g 的安装模式。全局模式可以让你在命令行中直接使用模块，因为这个安装会把package.josn里 bin 加入到PATH 环境变量中。可通过命令npm root -g 查看全局模块的安装目录。

本地路径，不带 -g 参数的。从当前目录一直查找到根目录/下有没有 node_modules 目录，有模块安装到这个目录下的 node_modules 目录里，如果没有找到则把模块安装到当前目录 node_modules 目录下。 

**start**：执行一个包的start脚本，这个一般是在package.json中scripts部分配置好的。

**config**：这个命令是配置npm运行环境的，主要是使用子命令get/set/delete/edit/list设置/查看每个选项，具体的使用方式参看帮助。

注意：
1. config中配置选项的值有很多的来源，并且优先级是不同的：命令行 > 环境变量 > 用户配置文件 > 全局配置 > 内置配置文件 > 默认配置。
2. 命令行中"--"开始的字符串会被解释为配置选项的key。例如：npm config set --foo bar。如果不提供值，这个变量的值会被设置为true。
3. 环境变量中以"npm_config_"开头的都被解释为配置选项。
4. package.json中config章节中的配置都会被加到环境变量中，以foo为例，格式为：npm_package_congif_foo。这个环境变量可以以process.env.npm_package_congif_foo的形式在程序中使用。

**list**：列出当前文件夹下安装的包。

其他的功能可以参考帮助文档。安装好node.js后，npm的帮助文件在目录的nodejs\node_modules\npm\html\doc下，可以直接打开查看命令的帮助；当然在命令行中执行：npm help <command>也是打开响应的帮助文档。

<br>
##创建与发布我们的包

构建并发布我们自己的包只需要简单几步：

1. 我们创建模块目录。
2. 编写模块的代码文件，放到模块目录中。
3. 编写package.json文件。当然也可以使用npm init命令按照提示生成这个文件。
4. 使用npm publish发布模块。

发布模块需要npm账号，使用adduser命令可以创建用户，按照提示输入用户名，密码和Email就可以了：

npm adduser
Username: ddd
Password: 
Email: ddd@gmail.com

注册成功后回到模块主目录，执行一下npm publish，如果没有任何错误提示，那么就发布成功了。发布成功后，模块会显示在 http://search.npmjs.org/上的"Latest Updates"里面。其他的用户就可以使用install命令安装你的模块了。不过如果你的模块没什么意义的话，还是不要给npm添乱了。

<br>
##npm编程

可以直接加载npm模块并使用npm模块完成命令行中的功能。比如下面两个最常用的函数：

    npm.load(configure, callback)

如果要对npm编程，调用它的API，那么这个load方法必须是在所有方法之前，最先调用的。第一个参数configure是代表命令行中npm使用的配置参数值对，支持的配置参数可以使用npm help config查看；第二个参数callback代表npm加载完调用的函数；两个参数都可以省略，但是推荐第二个参数写上。    npm.commands[<command>](args, callback) 

这是最常用的一个函数，就是调用命令行中的命令。第一个参数args代笔命令的参数，第二个参数代表执行命令完毕后调用的函数。

其他的命令可以参看http://npmjs.org/doc/中API Document部分的说明。综合使用的小例子如：

    npm.load({}, function() {
        // 安装依赖,然后启动服务器(startup函数启动了服务器)
        npm.commands.install(startup);
    });

<br>
#三、node的模块系统

<br>
##定义模块

在node.js中实现一个模块非常简单：新建一个js文件，编写代码，使用exports或者this导出接口。例如calculator.js：

    exports.add = function(a, b){
        return a + b;
    };

<br>
##引用模块   

在node.js中自身实现了require方法作为其引入模块的方法，这个我们已经相当熟悉了。例如引用上面我们写的模块calculator.js(假设在同目录下)：

    var calculator = require('./calculator.js');
    var sum = calculator.add(1,2);

这里再回顾一下模块的导入的规则：

* 核心模块通过标示符直接导入，而且总是被优先加载。例如，require('http')将总是返回内建的HTTP模块，即便又一个同名文件存在。
* 文件模块通过文件名导入(可以省略扩展名)，如果没有找到确切的文件名，Node将尝试以追加扩展名.js后的文件名读取文件，如果还是没有找到则尝试追加扩展名.node。.js文件被解释为JavaScript格式的纯文本文件，.node文件被解释为编译后的addon（插件）模块，并使用dlopen来加载。
* 以'/'为前缀的模块是一个指向文件的绝对路径，例如require('/home/publish/foo.js')将加载文件/home/publish/foo.js。
* 以'./'为前缀的模块是指向文件的相对路径，相对于调用require()的文件。也就是说为了使require('./circle') 能找到正确的文件，circle.js必须位于与foo.js 相同的路径之下。
* 如果标明一个文件时没有 '/' 或 './'前缀，该模块或是"核心模块"，或者是位于安装目录的node_modules目录中。如果在其他的目录下运行npm安装模块，则这里指的就是其他目录的node_modules目录。
* 在Node中，require.paths是一个保存模块搜索路径的字符串数组。当模块不以'/'，'./'或'../'为前缀时，将从此数组中的路径里进行搜索。可以在运行时改变require.paths数组的内容，以改变路径搜索行为。但在实践中发现，修改require.paths列表往往是造成混乱和麻烦的源头。

<br>
##缓存模块

首次加载一个模块后，模块会被缓存。当再次require一个模块的时候，如果编译器解析到的是同一个文件，则不会再次加载这个模块。

使用this, exports与module.exports的区别

这里使用this能导出成员是因为JavaScript中this指代当前域的执行上下文，所以使用了this以后，编译器认为这个成员在外部是可用的。这个比较直接，一般来说，容易混淆的是后面两个。

实际上，module.exports才是真正的英雄，exports只不过是一个小配角。你可以直接使用module.exports去导出公开的接口，而不是用exports。当没有直接使用module.exports的时候，exports做的事就是收集导出的成员并附加到module.exports上。但是一旦你直接使用了module.exports导出成员，那编译器会直接忽略exports导出的成员。比如：    module.exports = 'Real Man!';

    exports.name = function() {
        console.log('kidding...');
    };

在调用的时候：

    var test = require('./test.js');
    test.name();

会抛出异常：TypeError: Object Real Man! has no method 'name'。这里可以看到exports.name被忽略了。

此外，用exports导出的是典型的module的实例，导出的成员是该module实例要公开的成员；而使用module.exports可以导出任何类型的实例。例如：module.exports = [1,2,3]导出后的数组可以直接使用：

    var test = require('./test.js');
    console.log(test[2]); 

但是使用exports = [1,2,3]后，却不会有任何效果。