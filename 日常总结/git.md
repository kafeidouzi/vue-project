git log 查看最近commit版本

git reset --hard 版本号    回退版本

git push origin  HEAD --force    把本地推送到远程仓库

git push origin 分支名 --force   强行将本地推到远程

git reflog  查看命令操作历史

git diff 查看冲突具体位置

git status  查看当前状态以及后续操作提示


git branch -d 分支名       删除本地分支
git branch -D 分支名     上述操作如果删不掉，可以进行强制删除

git push origin --delete 分支名   删除远程分支


git branch 分支名   创建新分支

git push -u origin 分支名    第一次提交，与远程分支建立联系    之后可以使用Git push就可以

git push --set-upstream origin 分支名     与远程分支相关联

改完冲突后，保存  然后执行     git rebase --continue   它会自动检查冲突是否已经修改完成

git rebase 分支名

git merge 操作合并分支会让两个分支的每一次提交都按照提交时间（并不是push时间）排序，并且会将两个分支的最新一次commit点进行合并成一个新的commit，最终的分支树呈现非整条线性直线的形式

git rebase操作实际上是将当前执行rebase分支的所有基于原分支提交点之后的commit打散成一个一个的patch，并重新生成一个新的commit hash值，再次基于原分支目前最新的commit点上进行提交，并不根据两个分支上实际的每次提交的时间点排序，rebase完成后，切到基分支进行合并另一个分支时也不会生成一个新的commit点，可以保持整个分支树的完美线性

链接：https://www.jianshu.com/p/6960811ac89c


