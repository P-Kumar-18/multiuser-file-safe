import sys
input = sys.stdin.read

def main():
    data = input().split()
    idx = 0
    T = int(data[idx])
    idx += 1
    res = []

    for _ in range(T):
        N = int(data[idx])
        idx += 1

        x0 = y0 = float('inf')
        x1 = y1 = float('-inf')

        for _ in range(N):
            x = float(data[idx])
            y = float(data[idx + 1])
            idx += 2

            if x < x0: x0 = x
            if x > x1: x1 = x
            if y < y0: y0 = y
            if y > y1: y1 = y

        area = (x1 - x0) * (y1 - y0)
        res.append("%.6f" % area)

    print('\n'.join(res))

main()
