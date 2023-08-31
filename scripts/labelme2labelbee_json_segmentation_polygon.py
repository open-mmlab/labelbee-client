import json
import random
import string

"""
本代码用于将labelme标注的多边形点的json文件转化为labelbee可以读入的json文件（单步骤的、多边形的），用于搭建其两个不同的软件之间的桥梁.
"""

"""
该函数使用了Python的random.choices方法，它从给定字符集合（包括字母和数字）中随机选择k个字符，
并使用join方法将它们组合成一个字符串。
如果新生成的字符串已经存在于列表中则继续生成新的字符串，直到找到一个没有出现过的字符串。
最后返回生成的字符串列表。
"""
# 定义一个随机生成8位字符串的函数
def generate_strings(num_strings):
    strings = []
    for i in range(num_strings):
        random_string = ''.join(random.choices(string.ascii_letters + string.digits, k=8))# k为字符串长度，即8位
        while random_string in strings:
            # 如果新生成的字符串已经存在于列表中，重新生成一个新的字符串
            random_string = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
        strings.append(random_string)
    return strings

image_name = "cat.jpg" # 输入图片名称
labelme_route = image_name[0:-4] +".json" # 输入labelme文件地址

# 打开 JSON 文件并读取数据
with open(labelme_route, 'r') as me:
    datame = json.load(me)

# labelme2labelbee->dict
beeout = {}# 这个就是最后转成json，导出的内容
beeout['width'] = datame['imageWidth']
beeout['height'] = datame['imageHeight']
beeout['valid'] = True
beeout['rotate'] = int(0)

# 构造存在labelbee中的step_1的dict，step_1用于表示单步骤。
step_1 = {}
step_1['toolName'] = 'polygonTool'# 此处仅支持多边形

# 每一个序数对应的dict都表示一个标记的封闭图形。
# 提取labelme的信息
meshapes = datame['shapes']# labelme的json中所有的点什么的都在这

result = []# 即step_1中的result(list）
# 生labelbee的id
Bee_id = generate_strings(len(meshapes))

for n_medict in range(0, len(meshapes)):
    # 每循环一次都是一个封闭图形
    medict = meshapes[n_medict]
    mepoints = medict['points']
    result_single = {}
    result_single['id'] = Bee_id[n_medict]# 8位包括大小写字母，也可以包括部分数字，随机生成的。
    result_single['sourceID'] = ''
    result_single['valid'] = True
    result_single['textAttribute'] = ''
    # 拆开
    pointList = []# 这个是labelbee的-list
    for n_mepoint in range(0, len(mepoints)):
        beepoint = {}
        mepoint = mepoints[n_mepoint]
        # mex = mepoint[0]
        # mey = mepoint[1]
        beepoint['x'] = mepoint[0]
        beepoint['y'] = mepoint[1]
        pointList.append(beepoint)
    result_single['pointList'] = pointList
    result_single['attribute'] = ''
    result_single['order'] = int(n_medict + 1)
    result.append(result_single)

step_1['result'] = result
beeout['step_1'] = step_1
# 保存
# 将字典保存为JSON文件
# 需要预先在路径下准备一个对应名称的json
with open(image_name + '.json', 'w') as bo:
    json.dump(beeout, bo)
